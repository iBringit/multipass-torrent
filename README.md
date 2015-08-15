# multipass-torrent

Collects torrents from various sources (dump, RSS, HTML pages) and associates the **video files** within with IMDB ID using Stremio's index.get Addon API.

Runs on a multi-master replicated LevelDB, thanks to [mafintosh/multi-master-merge](http://github.com/mafintosh/multi-master-merge). The peers to replicate with are discovered via database ID, passed via ``--db-id=<16 byte hex string>``, discovered through DHT and SSDP.

This means the system is **distributed** and you can run several instances with their own DB copy. This is useful for creating redundancy and even crawling from several machines to distribute the load. 

It also has a Stremio Addon front-end, allowing for the content you scraped to be used in Stremio.


# example
```bash
node cli/multipass --db-id=ccb9a6f8a9af421809ad6b1f58a76f493fb30fb6 --source="https://torrentz.eu/feed_verified?q=" --db-path=/tmp/test
```

Now you can run the same command on another computer (or terminal) to see the replication. Run it without ``--source`` so you see the replication instead of importing the same source again
```bash
node cli/multipass --db-id=ccb9a6f8a9af421809ad6b1f58a76f493fb30fb6 --db-path=/tmp/test-2
```

Output from first command:
```
ccb9a6f8a9af421809ad6b1f58a76f493fb30fb6: finding other instances to replicate with
DB replication server listening at 50962
importing from https://torrentz.eu/feed_verified?q=
We have 0 torrents
importing finished from https://torrentz.eu/feed_verified?q=, 96 infoHashes, undefined of them new, through xmlRss importer (380ms)
We have 11 torrents
We have 23 torrents
We have 34 torrents
We have 48 torrents
We have 60 torrents
We have 73 torrents
We have 83 torrents
We have 96 torrents
We have 96 torrents
```
Output from second command:
```
ccb9a6f8a9af421809ad6b1f58a76f493fb30fb6: finding other instances to replicate with
DB replication server listening at 51192
We have 0 torrents
connected to peer 192.168.0.103:50962
We have 96 torrents
```

# Querying
Now that the data is in the DB, how to make use of it? 

Currently, no querying mechanism is implmeneted (that will change very soon), but you can see a simple dump by running (after you've populated DB at /tmp/test by one of the previous commands):
```bash
node cli/multipass --db-dump --db-id=ccb9a6f8a9af421809ad6b1f58a76f493fb30fb6 --db-path=/tmp/test
```

# Command-line args
* ``--source`` - provide an URL to source to crawl - this can be in .txt.gz dump, RSS feed or simply an HTML page containing info hashes; you can use multiple ``--source`` arguments
* ``--id`` or ``--db-id`` - the DB ID (16 bit hex string) to use for replication; instances with the same DB ID will replicate the DB among them
* ``--db-path`` - the filesystem path of the LevelDB database; default will be "multipass" inside OS's temporary directory
* ``--log=level`` - level is a number from 0 to 3, 3 being most verbose - the logging level 

# why multipass?
[For anything else there's multipass](https://www.pinterest.com/pin/83738874291404469/)
