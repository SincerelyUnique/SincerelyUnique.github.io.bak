---
title: Vision Unit Test
date: 2017-03-2 13:16:15
tags: 
categories: Research
---

Unit Test Solution
{Unit Test}

Purpose
Background
Test Method
1. Testng
(1) Introduction
(2) Features
(3) How to Develop by Testng
Appendix

Purpose
This document describes some unit test solutions, it is a reference for developing unit test solution in dashboard client and server. 
<!--more-->
In the past,we don’t have the unit test for our web project, we don’t have a perfect, clear description about each class,so we want to try to add the unit test.
Background
In mes line status monitor,we have two parts will test,the first part is the client server, in this part,we should receive the line status monitor configuration data from jsp(we should mock the request in java code),then we try to add the configuration data to the liferay database,both also we should load the data from liferay database.Another function is to get confituration data just like mfglines,process,workstations,partnumbers,workorders and page area data form server side by restful uri,we need test it.

1.Liferay Test 
   action
addLineStautsMonitorConfigsTest();
loadLineStautsMonitorConfigsTest();


   dao
addAllLineStautsMonitorConfigTest();
loadAllLineStautsMonitorConfigTest();

2.Rest Test
    wsClient
```
loadMfgLinesTest();
loadProcessesTest();
loadWorkstationsTest();
loadPartNumbersTest();
loadWorkOrdersTest();
loadLineStatusMonitorAreasTest();
```
```
    Rest Interface
getJsonByPathParamTest();
getJsonByKeyTest();
postJsontoRestfulTest();
putJsontoRestfulTest();
getRestfulServerPathTest();
```

Test Path:
Liferay Test
	action (need test)-----> service (don’t need test) -------> dao (need test)
Rest Test
	action ( don’t need test ) ------> wsClient ( need test )------> Rest Interface (need test)

In dashboard server,we will also test two parts,the first is MESR restful webservice( service-dao ),we will check loadMfgLines,loadProcess,loadWorkstations,loadPartnumbers,
loadWorkOrders from MESR database,another part is test ehcache rest service,this part will contains the configuration cache and page area cache,such as the chart below:


1.MESR Test
```
loadMfgLineTest();
loadProcessTest();
loadFilterWorkstationTest();
loadPartnumberTest();
loadWorkorderTest();
```
2.Cache Test
```
getConfigurationTest();
loadPageDataByConfigurationTest();
```
Test Path:
MESR Test
rest interface (need test) -----> service (need test) ------> dao (need test)
Cache Test
	restful interface (need test) -----> service (need test) -----> dao (need test)
In above,the MESR Test maybe simple access from mesr database,but the cache test will be complex,because it contains some operations about compose data format and timezone and others.

Test Method
1.Testng

(1) Introduction
TestNG is a testing framework for the Java programming language created by Cédric  
Beust and inspired by JUnit and NUnit. The design goal of TestNG is to cover a wider 
	range of test categories: unit, functional, end-to-end, integration, etc., with more powerful 
	and easy-to-use functionalities.

(2) Features
Annotation support.
Support for parameterized and data-driven testing (with @DataProvider and/or XML configuration).
Support for multiple instances of the same test class (with @Factory)
Flexible execution model. TestNG can be run either by Ant via build.xml (with or without a test suite defined), or by an IDE plugin with visual results. There isn't aTestSuite class, while test suites, groups and tests selected to run are defined and configured by XML files.
Concurrent testing: run tests in arbitrarily big thread pools with various policies available (all methods in their own thread, one thread per test class, etc.), and test whether the code is multithread safe.
Embeds BeanShell for further flexibility.
Default JDK functions for runtime and logging (no dependencies).
Dependent methods for application server testing.
Distributed testing: allows distribution of tests on slave machines.

(3) How to Develop by Testng
Now we have a demo about how to use testng,in this demo we assume that 
we have some test data from xml file, we will test it according testng method.Now let’s create a new maven project,then step by step as below: 

1.Maven Dependency
```
<dependencies>
                     <!-- also can use google Gson  -->
		<dependency>
			<groupId>net.sf.json-lib</groupId>
			<artifactId>json-lib</artifactId>
			<version>${json-lib.version}</version>
			<classifier>jdk15</classifier>
		</dependency>

		<dependency>
			<groupId>org.dbunit</groupId>
			<artifactId>dbunit</artifactId>
			<version>${dbunit.version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-test</artifactId>
			<version>${spring.version}</version>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${spring.version}</version>
		</dependency>

		<dependency>
			<groupId>org.apache.commons</groupId>
			<artifactId>commons-lang3</artifactId>
			<version>${commons.lang3.version}</version>
		</dependency>

		<dependency>
			<groupId>dom4j</groupId>
			<artifactId>dom4j</artifactId>
			<version>${dom4j.version}</version>
		</dependency>

		<dependency>
			<groupId>commons-lang</groupId>
			<artifactId>commons-lang</artifactId>
			<version>${commons-lang.version}</version>
		</dependency>

		<dependency>
			<groupId>org.testng</groupId>
			<artifactId>testng</artifactId>
			<version>${testng.version}</version>
			<scope>test</scope>
		</dependency>
		
	</dependencies>

	<properties>
		<spring.version>4.1.6.RELEASE</spring.version>
		<dom4j.version>1.6.1</dom4j.version>
		<commons.lang3.version>3.3.2</commons.lang3.version>
		<dbunit.version>2.4.8</dbunit.version>
		<json-lib.version>2.4</json-lib.version>
		<commons-lang.version>2.6</commons-lang.version>
		<testng.version>6.8.7</testng.version>
		<dom4j.version>1.6.1</dom4j.version>
	</properties>
```



2.Create TestData.xml
We will create a xml file for test,the file have a parent node named <data></data>,it also have each sub node ,pay attention that each sub node must appointed to the test method that in java code. if have two sub node have the same name just like testMethod3 below, it will have a different test output.

TestData.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<data>
	<testMethod1>
		<input>Jalen</input>
		<output>1017108</output>
	</testMethod1>

	<testMethod2>
		<input>Abely</input>
		<output>1016232</output>
	</testMethod2>

	<testMethod3>
		<input>Jermy</input>
		<output>1016231</output>
	</testMethod3>

	<testMethod3>
		<input>Jermy</input>
		<output>185cm</output>
	</testMethod3>

	<testMethod4>
		<input>Mercy</input>
		<output>1016233</output>
	</testMethod4>
</data>
```


3.Parse TestData.xml
Now we create a java file to parse xml.this is a tool class.the return type is a list.

ParserXml.java
```
public class ParserXml {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List parserXml(String fileName) {
		File inputXml = new File(fileName);
		List list = new ArrayList();
		SAXReader saxReader = new SAXReader();
		try {
			Document document = saxReader.read(inputXml);
			Element elements = document.getRootElement();
			for (Iterator i = elements.elementIterator(); i.hasNext();) {
				Element element = (Element) i.next();
				Map map = new HashMap();
				Map tempMap = new HashMap();
				for (Iterator j = element.elementIterator(); j.hasNext();) {
					Element node = (Element) j.next();
					tempMap.put(node.getName(), node.getText());
				}
				map.put(element.getName(), tempMap);
				list.add(map);
			}
		} catch (DocumentException e) {
			System.out.println(e.getMessage());
		}
		return list;
	}
}
```
3.Set DataProvider
The DataProvider is an very important part of testng.It control the data source where it from and where it go.
```
public class SetDataProvider {

	@SuppressWarnings("rawtypes")
	private List list;

	public SetDataProvider() {
		this.getXmlData();
	}

	public void getXmlData() {
		ParserXml parserXml = new ParserXml();
		list = parserXml.parserXml(new File("src/main/resources/TestData.xml")
				.getAbsolutePath());
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@DataProvider
	public Object[][] providerTestMethod(Method method) {
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		for (int i = 0; i < list.size(); i++) {
			Map m = (Map) list.get(i);
			if (m.containsKey(method.getName())) {
				Map<String, String> dm = (Map<String, String>) m.get(method
						.getName());
				result.add(dm);
			}
		}
		Object[][] files = new Object[result.size()][];
		for (int i = 0; i < result.size(); i++) {
			files[i] = new Object[] { result.get(i) };
		}
		return files;
	}
}
```


4.Test Method

```
public class TestDataProvider extends SetDataProvider {

    @Test(dataProvider="providerTestMethod")
    public void testMethod1(Map<?, ?> param){
        System.out.println("method1 received:"+param.get("input"));
    }
     
    @Test(dataProvider="providerTestMethod")
    public void testMethod2(Map<?, ?> param){
        System.out.println("method2 received:"+param.get("input"));
    }
     
    @Test(dataProvider="providerTestMethod")
    public void testMethod3(Map<?, ?> param){
        System.out.println("method3 received:"+param.get("input"));
        System.out.println("method3 output:"+param.get("output"));
    }
    
    @Test(dataProvider="providerTestMethod")
    public void testMethod4(Map<?, ?> param){
        System.out.println("method4 received:"+param.get("input"));
    }
}
```


5.Test Result
We can click a test method to run as TestNG Test by eclipse, also we can right click the java file and run as TestNG Test( if you want to generate a testng.xml,right click your project and find TestNG item,click Convert to TestNG,then run it as suite ),the test result will show below.

testng.xml 
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Suite">
  <test name="Test">
    <classes>
      <class name="com.spring.testng.test.parsexml.TestDataProvider"/>
    </classes>
  </test> <!-- Test -->
</suite> <!-- Suite -->
```



Console:
```
[TestNG] Running:
  /home/jalenchu/jalen_chu/Tools/client/eclipse/workspace/spring-testng-test/testng.xml

method1 received:Jalen
method2 received:Abely
method3 received:Jermy
method3 output:1016231
method3 received:Jermy
method3 output:185cm
method4 received:Mercy

===============================================
Suite
Total tests run: 5, Failures: 0, Skips: 0
===============================================
```


Results of running suite:


(4) How to Develop in Dashboard Server
```
1.Maven Dependency

                       <testResources>
			<testResource>
				<directory>src/main/webapp</directory>
			</testResource>
			<testResource>
				<directory>src/test/resources</directory>
				<!-- <filtering>true</filtering> -->
			</testResource>
		</testResources>

                        <plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-surefire-plugin</artifactId>
					<version>${mvn.plugin.surefire.version}</version>
					<configuration>
						<forkCount>3</forkCount>
						<reuseForks>true</reuseForks>
						<argLine>-Xmx1024m -XX:MaxPermSize=256m -Djava.compiler=NONE</argLine>
						<additionalClasspathElements>  
                			<additionalClasspathElement>  
                    			${basedir}/dashboardServerWeb/target/classes  
                			</additionalClasspathElement>  
            			</additionalClasspathElements> 
						<suiteXmlFiles>
							<suiteXmlFile>src/test/resources/testng.xml</suiteXmlFile>
						</suiteXmlFiles>
						<properties>
							<property>
								<name>reporter</name>
								<value>org.testng.reporters.XMLReporter</value>
							</property>
						</properties>
					</configuration>
				</plugin>
```



2. testng.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Suite" parallel="none">
	<parameter name="xmlDataFileName" value="src/test/resources/TestData.xml" />

	<test name="Full Test Suites">
		<packages>
			
		</packages>
	</test>

	<test name="Just Test">
		<classes>
			<!-- <class name="com.sanmina.mes.dashboard.server.zmytest.TestDataProvider" /> -->
		</classes>
		<groups>
			<run>
				<include name="testng.testData"/>
			</run>
		</groups>
	</test>

	<test name="Test MESR Restful Interface">
		<classes>
			<class name="com.sanmina.mes.dashboard.server.wsServer.MesrServiceTest" />
		</classes>
		<groups>
			<run>
				<include name="mesrService.loadMfgLine"/>
				<include name="mesrService.loadProcess"/>
				<include name="mesrService.loadFilterWorkstation"/>
				<include name="mesrService.loadPartnumber"/>
				<include name="mesrService.loadWorkorder"/>
			</run>
		</groups>
	</test>
	
	<test name="Test Cache Restful Interface">
		<classes>
			<!-- <class name="com.sanmina.mes.dashboard.server.wsServer.CacheWebServiceTest" /> -->
		</classes>
		<groups>
			<run>
				<include name="cacheWebService.getConfiguration"/>
				<include name="cacheWebService.loadPageDataByConfiguration"/>
			</run>
		</groups>
	</test>
	
	<test name="Test Service Interface">
		<classes>
			<!-- <class name="com.sanmina.mes.dashboard.server.service.LineStatusMonitorServiceTest" /> -->
		</classes>
		<groups>
			<run>
				<include name="service.loadMfgLines"/>
				<include name="service.loadProcessesByMfgLine"/>
				<include name="service.loadWorkstationsByProcess"/>
				<include name="service.loadPartnumberByLocationKey"/>
				<include name="service.loadWorkorderByPartKey"/>
				<include name="service.loadPage"/>
				<include name="service.setLineStatusMonitorAreasCache"/>
			</run>
		</groups>
	</test>
	
	<test name="Test Dao Interface">
		<classes>
			<!-- <class name="com.sanmina.mes.dashboard.server.dao.LineStatusMonitorDaoTest" /> -->
		</classes>
		<groups>
			<run>
				<include name="dao.loadPreferenceConfig"/>
				<include name="dao.getChangeoverMinutes"/>
				<include name="dao.getCummulativeThroughput"/>
				<include name="dao.getCurrentHourProperties"/>			
				<include name="dao.getLastHourYield"/>				
				<include name="dao.getPoint"/>				
				<include name="dao.getSmos"/>
			</run>
		</groups>
	</test>
	
</suite>
```



3.TestData.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<data>
	<testMethod1>
		<input>=====testMethod1=======</input>
	</testMethod1>
	<testMethod2>
		<input>=====testMethod2=======</input>
	</testMethod2>
	<testMethod3>
		<input>=====testMethod3=======</input>
	</testMethod3>
	<testMethod3>
		<input>=====testMethod3=======---</input>
	</testMethod3>
	<testMethod4>
		<input>=====testMethod4=======</input>
	</testMethod4>

	<loadMfgLineTest>
		<databasehost>10.180.1.24</databasehost>
		<database>mesr_e26</database>
		<schema>mesr</schema>
		<expectResults>
			[
				MfgLine[mfgLineKey=8371888,mfgLine=L110_ASSY_LINE1],
				MfgLine[mfgLineKey=8371886,mfgLine=L110_SMT_Line1],
				MfgLine[mfgLineKey=8371887,mfgLine=L120_AOI_Line1]
			]
		</expectResults>
	</loadMfgLineTest>

	<loadProcessTest>
		<databasehost>10.180.1.24</databasehost>
		<database>mesr_e26</database>
		<schema>mesr</schema>
		<mfglinekey></mfglinekey>
		<expectResults>
			[
				Process[locationKey=1214,process=1INSPSMTBOT],
				Process[locationKey=1205,process=1INSPSMTTOP],
				Process[locationKey=56110,process=1SMTSTART],
				Process[locationKey=55556,process=SMTT4SOMs]
			]
		</expectResults>
	</loadProcessTest>
	
	<loadFilterWorkstationTest>
		<databasehost>10.180.1.24</databasehost>
		<database>mesr_e26</database>
		<schema>mesr</schema>
		<mfglinekey></mfglinekey>
		<process></process>
		<expectResults>
			[
				{"locationKey":1214,"workstation":"BS-1 INSP SMT BOT"}
			]
		</expectResults>
	</loadFilterWorkstationTest>
	
	<loadPartnumberTest>
		<databasehost>10.180.1.24</databasehost>
		<database>mesr_e26</database>
		<schema>mesr</schema>
		<workstationkey></workstationkey>
		<expectResults>
			[
				PartNumber[partKey=160703, partNumber=WLLIEP8000077D000/C1R], 
				PartNumber[partKey=160212, partNumber=WLLIEP8000077D000/C2], 
			    PartNumber[partKey=152698, partNumber=WLLIEP800007AL000/D1], 
				PartNumber[partKey=153005, partNumber=WLLIEP800007GL000/D1], 
				PartNumber[partKey=61496, partNumber=WLLIEP80001129002/G3], 
				PartNumber[partKey=153142, partNumber=WLLIEP8300033Q000/1.0], 
				PartNumber[partKey=152815, partNumber=WLMENT247152/1.15], 
				PartNumber[partKey=153461, partNumber=WLMENT247152/1.15FR], 
				PartNumber[partKey=159542, partNumber=WLTERA618-560-01/N]
			]
		</expectResults>
	</loadPartnumberTest>
	
	<loadWorkorderTest>
		<databasehost>10.180.1.24</databasehost>
		<database>mesr_e26</database>
		<schema>mesr</schema>
		<partkey></partkey>
		<expectResults>NULL</expectResults>
	</loadWorkorderTest>
</data>
```


4.MesrServiceTest.java
```
package com.sanmina.mes.dashboard.server.wsServer;

import org.testng.ITestContext;
import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNotNull;

import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.sanmina.mes.dashboard.server.model.MfgLine;
import com.sanmina.mes.dashboard.server.to.AbstractLSMContextTests;
import com.sanmina.mes.dashboard.server.to.TestGlobalConstants;

public class MesrServiceTest extends AbstractLSMContextTests
{
	@Test(priority = 1,groups = { "mesrService.loadMfgLine" },dataProvider = "xmlDataProvider") 
	public void loadMfgLineTest(Map<?, ?> objDataParam,ITestContext objTestNGContext) 
	{
		String databasehost = null;
		String database = null;
		String schema = null;
		String result = null;
		String expectResult = null;
		
		try {
			databasehost = (String) objDataParam.get(TestGlobalConstants.TEST_DATA_NODE_HOST);
			database = (String) objDataParam.get(TestGlobalConstants.TEST_DATA_NODE_DATABASE);
			schema = (String) objDataParam.get(TestGlobalConstants.TEST_DATA_NODE_SCHEMA);
			System.out.println(databasehost+"=="+database+"=="+schema);
			
			assertNotNull(lineStatusMonitorService);
			List<MfgLine> mfgLines = lineStatusMonitorService.loadMfgLines(databasehost,database, schema);
			Gson gson = new Gson();
			result = gson.toJson(mfgLines).trim();
			expectResult = ((String) objDataParam.get(TestGlobalConstants.TEST_DATA_NODE_EXPECTRESULTS)).trim();
			System.out.println(result);
			assertEquals(result,expectResult);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test(priority = 2,groups = { "mesrService.loadProcess" },dataProvider = "xmlDataProvider") 
	public void loadProcessTest(Map<?, ?> objDataParam)
	{
		System.out.println("=====loadProcessTest=====");
	}
	
	@Test(priority = 3,groups = { "mesrService.loadFilterWorkstation" },dataProvider = "xmlDataProvider") 
	public void loadFilterWorkstationTest(Map<?, ?> objDataParam)
	{
		System.out.println("=====loadFilterWorkstationTest=====");
	}
	
	@Test(priority = 4,groups = { "mesrService.loadPartnumber" },dataProvider = "xmlDataProvider") 
	public void loadPartnumberTest(Map<?, ?> objDataParam)
	{
		System.out.println("=====loadPartnumberTest=====");
	}
	
	@Test(priority = 5,groups = { "mesrService.loadWorkorder" },dataProvider = "xmlDataProvider") 
	public void loadWorkorderTest(Map<?, ?> objDataParam)
	{
		System.out.println("=====loadWorkorderTest=====");
	}
}
```




Appendix
1.Structure


2.Annotations
@BeforeSuite: The annotated method will be run before all tests in this suite have run. 
@AfterSuite: The annotated method will be run after all tests in this suite have run. 
@BeforeTest: The annotated method will be run before any test method belonging to the classes inside the <test> tag is run. 
@AfterTest: The annotated method will be run after all the test methods belonging to the classes inside the <test> tag have run. 
@BeforeGroups: The list of groups that this configuration method will run before. This method is guaranteed to run shortly before the first test method that belongs to any of these groups is invoked. 
@AfterGroups: The list of groups that this configuration method will run after. This method is guaranteed to run shortly after the last test method that belongs to any of these groups is invoked. 
@BeforeClass: The annotated method will be run before the first test method in the current class is invoked. 
@AfterClass: The annotated method will be run after all the test methods in the current class have been run. 
@BeforeMethod: The annotated method will be run before each test method. 
@AfterMethod: The annotated method will be run after each test method.
@DataProvider:	Marks a method as supplying data for a test method. The annotated method must return an Object[][] where each Object[] can be assigned the parameter list of the test method. The @Test method that wants to receive data from this DataProvider needs to use a dataProvider name equals to the name of this annotation.
@Factory:Marks a method as a factory that returns objects that will be used by TestNG as Test classes. The method must return Object[].
@Listeners:Defines listeners on a test class.
@Parameters:Describes how to pass parameters to a @Test method.


