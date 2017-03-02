---
title: ehcache research
date: 2017-03-2 12:15:15
tags: 
categories: Research
---
1. Purpose
This document describes some cache solutions, it is a reference for developing cache solution in dashboard server.     
In current dashboard, when loading the data from database, often the performance is not good enough, by introducing cache into dashboard, performance should be get improved.
Why Need Cache

<!--more-->

2. The background:
Load dashboard  configurations from Liferay portlet preference slowly
Load dashboard data from MESR database slowly
No third party cache framework, today we save the dashboard data into Java Map 

3. The cache will:
Be used to save the dashboard and the its configurations data
Bed used in Dashboard server
Make the interactive fast between the B/S
Make a good integration with Restful API

4. Popular Cache Solutions
Ehcache 
Introduce: a simple plug-in component write by java.
Features: fast and simple,lightweight, little dependence, extension and listener. support persistence, support hibernate, distribution, cluster, support REST & SOAP api, support LRU,LFU and FIFO strategy.
Memcache
Introduce: a cache for reducing the database pressure
Features: multiple file type, deadline 30 days, the limit of key length is 250 bytes, the items limit to 1M( slabs ), the biggest connection is 200 and the biggest soft connection is 1024, a socket communication server that no block, support multiple program language in client, support TCP and UDdepend on GCC and libevent,high performance,simple install, support multi thread,distribution, support LRU, management by hash table, support P protocol
Redis
Introduce: a cache( database ) which can save a multiple type data .
Features: support persistence,rich data types,replication, do not support multi thread, a key-value memory system like memcache, support master-slave, support multiple program language in client, support multiple data model( not only String type,it can save list and collection ), three cache method contain memory cache,disk cache and log cache,
OSCache
Introduce: a standard JSP page data cache. 
Features: cache any object, comprehensive API, persistence, cluster, expired limit, only cache http status 200,
JCS(Java Caching System)
Introduce:  a temporary buffer area main used by configure the configuration files.
Features: distributed, cluster, use JavaGroups to manage dependencies, expired limit, high performance for that which read operation more than write operation, support LRU and MRU, support lateral， a master server can contains 256 client server,
JCache
Introduce: a temporary cache for java object.
Features: spooling, consistency, access shared,can used for jsp data cache,
ShiftOne
Introduce:Java lib that performs a series of strict object caching policies
Features: support LRU,LFU,FIFO
SwarmCache
Introduce: a java cache plug-in component
Features: distributed, high cluster, use IP multicast to communicate, LGPL
JBossCache
Introduce:.a cache strategy by replication
Features: cluster, replication, support jboss application service, contain TreeCache and TreeCacheAOP
Whirlycache
Introduce: a simple java cache implementation from sun company
Features: support LRU,LFU and FIFO, support hibernate control, implementation by configuration files,Cache for fast, configurable, and existing objects in memory
Voldemort
Introduce: Voldemort is a distributed Key-Value storage system using Java language development
Features: distributed, key-value pairs, Data is automatically replicated over multiple servers,supports cache synchronization between multiple servers
Cacheonix
Introduce: distributed cluster cache system based on Java
Features: flexibility ,replication, support genericity cache API, can used with ORM, data partition, persistence

5. Fast & Lightweight
Ehcache is one of the faster java cache in past few years, it is designed for large, high concurrent system. We don’t need to make a complex configuration for cache manager, and it also have a friendly API for us.
It is lightweight, we only need import two jar file like ehcache-x.x.x.jar and ehcache-core-x.x.x.jar, it has a friendly integration with spring, if we use the springMVC annotation, we need import the ehcache-spring-annotations-x.x.x.jar.
The ehcache also have a very simple dependence, it is only the SLF4J. 

6. Flexibility
We can cache about several gigabyte data in memory and disk, it has a fine optimization for big data, even deal with several hundred gigabyte in big memory, it can support multiple cache manager in a single virtual machine, it can be extended to hundreds of nodes in Terracotta server matrix.
Ehcache has good API interface, support serialization( if the cache object not support serialization,but also used the other function of ehcache  ), it also has a good expire strategy for cache element, we can set and control the cache lifecycle.
Ehcache also support LRU,LFU,FIFO algorithm。

7. Standard Support
Support for JSR 107 JCACHE API  implementation, it’s convenient to transplant in the future.

8. Persistence
When the VM restart, It can recover data from disk, we can use the method cache.flush() to save the data to disk.

9. Listeners
We can register cache listeners to deal with the event. We have two listeners interface, such as 
CacheManagerEventListener & CacheEventListener

10. JMX
By default, the JMX support is opened, we can listen and manager the Beans like :
CacheManager、Cache、CacheConfiguration、CacheStatistics 

11. Cluster & Distributed Processing
From version1.7,The ehcache support 5 kinds of cluster, include Terracotta, RMI( 1.2 ), JMS, JGroups( 1.5 ) and EhCache Server.
In cluster cache, we need make sure all the cache objects( usually include the key-value  ) must can be serialization, it means implements java.io.Serializable.

12. Repertory List & Functions
Ehcache-core： 		API, Standard cache engine,support RMI & Hibernate
Ehcache：	Distributed Ehcache, including Ehcache core and Terracotta Library
Ehcache-monitor：	Enterprise level monitoring and management
Ehcache-web：	Provide caching, gzip filters for Java Servlet Container
Ehcache-jcache：	JSR107 JCACHE implementation.
Ehcache-jgroupsreplication：	Use JGroups
Ehcache-jmsreplication：		Use JMS
Ehcache-openjpa：	OpenJPA Plug-in component
Ehcache-server：		RESTful cache server for war deploy or Single deploy
Ehcache-unlockedreadsview： Terracotta cache
Ehcache-debugger： 	Record RMI distribute call back event
Ehcache for Ruby： 	Support Jruby and Rails
Class Definition
CacheManager：cache manager, in previous only support singleton, but now can support multiton.
Cache：A CacheManager can set few cache to save data，all cache implement Ehcache interface
element：A piece of data (cache items) 
system of record（SOR）：A component to read or writer real data( cache ), logic tiers or interface tiers or DB.

13. Simple Developer Guide
First create an instance of CacheManager, L1,L2,disk
Init this CacheManager instance
Create an Cache instance from CacheManager,define the L1,L2, even the disk
Put the data into the cache
Load the cache data from the cache
Remove the cache  


