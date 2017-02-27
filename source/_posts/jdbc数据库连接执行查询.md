---
title: jdbc数据库连接执行查询
date: 2017-02-22 14:35:03
tags: jdbc
categories: Java
---
1.查询数据
<!--more-->
```
package com.dao;



import java.sql.Connection;

import java.sql.DriverManager;

import java.sql.ResultSet;

import java.sql.Statement;



public class AcessJdbc{

	public AcessJdbc() {

		// TODO Auto-generated constructor stub

	}

	

	public static void main(String[] args) {

		System.out.println("this is a test");

		

		try {

			Class.forName("org.postgresql.Driver").newInstance();

			//Class.forName("org.postgresql.Driver").newInstance();

			String url = "jdbc:postgresql://localhost:5432/mydb" ;

			Connection conn=DriverManager.getConnection(url,"postgres","postgres");

			Statement st=conn.createStatement();

			String sql="select * from testtable";

			ResultSet rs=st.executeQuery(sql);

			while(rs.next()){

				System.out.print(rs.getInt(1));

				System.out.print("\t");

				System.out.print(rs.getString(2));

				System.out.print("\t");

				System.out.println(rs.getInt(3));

			}

			rs.close();

			st.close();

			conn.close();

		

		} catch (Exception ee) {

			// TODO: handle exception

			System.out.println(ee.getMessage());

			System.out.println(ee);

		}

		

	}

}

```

2.插入数据
```
package com.dao;



import java.sql.Connection;

import java.sql.DriverManager;

import java.sql.ResultSet;

import java.sql.Statement;



public class AcessJdbc{

	public AcessJdbc() {

		// TODO Auto-generated constructor stub

	}

	

	public static void main(String[] args) {

		System.out.println("this is a test");

		

		try {

			Class.forName("org.postgresql.Driver").newInstance();

			//Class.forName("org.postgresql.Driver").newInstance();

			String url = "jdbc:postgresql://localhost:5432/mydb" ;

			Connection conn=DriverManager.getConnection(url,"postgres","postgres");

			Statement st=conn.createStatement();

			String sql="insert into testtable(id,name) values(56,'abc')";

			int rs=st.executeUpdate(sql);

			/*

			while(rs.next()){

				System.out.print(rs.getInt("id"));

				System.out.print("\t");

				System.out.print(rs.getString(2));

				System.out.print("\t");

				System.out.println(rs.getInt("tel"));

			}

			rs.close();

			st.close();

			conn.close();

			*/

		} catch (Exception ee) {

			// TODO: handle exception

			System.out.println(ee.getMessage());

			System.out.println(ee);

		}		

	}

}

```
