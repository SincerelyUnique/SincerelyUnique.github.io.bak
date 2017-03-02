---
title: RESTful Web Service Good Design Practice
date: 2017-03-2 13:18:15
tags: 
categories: Research
---
RESTful Web Service Good Design Practice
{ Applied to Vision }

Purpose

We should make sure have a friendly and sententious URL definition  in vision server side, and in our program, a very important point is to position our resources for user, so that we need to display a good and friendly uri for users include developers. 
REST(representational state transfer) is an architectural style consisting of a coordinated set of components,connectors,and data elements within a distributed hypermedia system.it refers to a collection of architecture constraints and principles, it is an application design.a style!
So, we need it in our vision server. 
<!--more-->


URI Operation Design

##Good design principles##

1. Version your API:
```
 		https://api.example.com/v1/
```
    Reference: 
	```
		https://developer.github.com/v3/media/#request-specific-version
		http://api.example.com/1.0/foo
		http://api.example.com/1.2/foo
		http://api.example.com/2.0/foo
	```
	Or set the version in HTTP header:
	Reference: 
	```
    curl https://api.github.com/users/technoweenie -I
	HTTP/1.1 200 OK
	X-GitHub-Media-Type: github.v3

        Accept: vnd.example-com.foo+json; version=1.0
		Accept: vnd.example-com.foo+json; version=1.2
		Accept: vnd.example-com.foo+json; version=2.0
	```
2. Use Http Method
	Such as 
	```
	GET（SELECT）, get resources from server.
	POST（CREATE）, create resources in server  (from client or others)
	PUT（UPDATE）, update the resources that client supplied.
	PATCH（UPDATE）, client supply specific properties and the server update
	DELETE（DELETE）,delete specific resource from server.
	```
	Eg :

					HTTP Method
3. Uniform Resource Locator (URL)
Collection, such as http://api.example.com/resources/
Element, such as http://api.example.com/resources/item17
GET
List the URIs and perhaps other details of the collection's members.
Retrieve a representation of the addressed member of the collection, expressed in an appropriate Internet media type.
PUT
Replace the entire collection with another collection.
Replace the addressed member of the collection, or if it does not exist, create it.
POST
Create a new entry in the collection. The new entry's URI is assigned automatically and is usually returned by the operation.
Not generally used. Treat the addressed member as a collection in its own right and create a new entry in it
DELETE
Delete the entire collection.
Delete the addressed member of the collection

4. Use nouns, instead of verbs:
```
	Right : 
		GET /products :	will return the list of all products
			POST /products:	will add a product to the collection
			GET /products/4:	will return product #4
			PATCH/PUT /products/4:	will update product #4
		Wrong :
			/getProducts
			/listOrders
			/show_Order?orderId=1
```
5. Use the plural form
	Reference : above examples.
	Use /artists instead of /artist.
GET and HEAD calls should always be safe
	It means that GET and HEAD method should always be safe to call.
	Eg: 
		GET /delete_Product?id=1
	The state shouldn’t be altered.
6. Use nested resources
	Like java Inheritance relationship , also like a tree with its leaves, always from a 
	big abstract instance to a specific instance, it’s stratified。
	Reference :
		GET /users/jalen/books/spring_in_action
7. Paging
	Returning a very large result set from HTTP is not a good idea neither, it cost 
	so much performance,so paging. (don’t make the URI too large)
	Reference :https://developer.github.com/guides/traversing-with-pagination/
8. Use proper HTTP status codes
```
	Eg :
	Success code:
		201 Created:should be used when creating content (INSERT),
		202 Accepted:should be used when a request is queued for background 
			processing (async tasks),
		204 No Content: should be used when the request was properly executed 
			but no content was returned (a good example would be when you 
			delete something).
	Client error codes:
		400 Bad Request:should be used when there was an error while 
			processing the request payload (malformed JSON, for instance).
		401 Unauthorized:should be used when a request is not authorized 
			(wrong access token, or username or password).
		403 Forbidden:should be used when the request is successfully 
			authorized (see 401), but the action was forbidden.
		406 Not Acceptable:should be used when the requested format is not 
			available (for instance, when requesting an XML resource from a 
			JSON only server).
		410 Gone:Should be returned when the requested resource is 
			deleted and will never be available again.
		422 Unprocessable entity:Could be used when there was a validation 
			error while creating an object.
```
	Reference :https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
9. Use “_” or “-” to read friendly
	Reference :
		http://www.oschina.net/news/38119/oschina-translate-reward-plan
Use “/” show the layer
	Reference :
		/git/git/commit/e3af72cdafab5993d18fae056f87e1d675913d08
Always return a consistent error payload(error handling)
	HTTP/1.1 401 Unauthorized
	{
			“Status”: “Unauthorized”,
			“message”:”No access token provided”,
			“Request_id”: “xxxxxxxxxxxxx”
		}
Filtering
	The API provide the reference data , return to a result.
		Reference :
			?limit=10：return quantity limit
			?page=2&per_page=100：return the page, and the page items
			?sort_by=name & order=asc: return the sort item and how to sort


10. Hypermedia API
	Reference :
	{
		“Link”:{
			"rel":   "collection https://www.example.com/zoos",
			“Href”: “https://api.example.com/zoos”,
			“Title”: “list of zoos”,
			“Type”: “application/vnd.your_format+json”
			}
}

11. Security
	The interface used https by default,and give a key-value reference behind.For 
	platform API, choose the OAuth2.0 may be better.


##conclusion##:
url
Show what to do
http method
Show how to do
http status code
Show the result


