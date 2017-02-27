---
title: 第一个liferay portlet：guestbook-portlet
date: 2017-02-21 08:32:38
tags: guestbook
categories: Liferay
---
*摘要: 注：这个是官网的例子（官网有详细步骤，链接在最下面） liferay SDK：liferay-plugins-sdk-6.2 liferay portal：liferay-portal-6.2-ce-ga5 eclipse version=4.4.2*
<!--more-->
0. 效果图
![](http://static.oschina.net/uploads/img/201602/17090338_dka7.jpg)

1. 新建项目: Life Plugin Project
![](http://static.oschina.net/uploads/img/201602/17090339_AzQA.jpg)

2. 新建Liferay Portlet
![](http://static.oschina.net/uploads/img/201602/17090340_IMzP.jpg)

3. 项目结构：
![](http://static.oschina.net/uploads/space/2016/0217/085039_25Cm_2550349.png)

4. 代码：(view + controller + model)
1）view.jsp
```
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<portlet:defineObjects />
<jsp:useBean id="entries" class="java.util.ArrayList" scope="request"/>

    <liferay-ui:search-container>
    <liferay-ui:search-container-results
                results="<%= entries %>"
    />

    <liferay-ui:search-container-row
        className="com.liferay.docs.guestbook.model.Entry"
        modelVar="entry"
    >
    
        <liferay-ui:search-container-column-text property="message" />

        <liferay-ui:search-container-column-text property="name" />

        
    </liferay-ui:search-container-row>

    <liferay-ui:search-iterator />
</liferay-ui:search-container>

    <aui:button-row  cssClass="guestbook-buttons">
    
            <portlet:renderURL var="addEntryURL">   
                    <portlet:param name="mvcPath" value="/html/guestbook/edit_entry.jsp"></portlet:param>
            </portlet:renderURL>   
    
            <aui:button onClick="<%= addEntryURL.toString() %>" value="Add Entry"></aui:button>
        
    </aui:button-row>
```
2)edit_entry.jsp
```
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui" %>
<portlet:defineObjects />

        <portlet:renderURL var="viewURL">
                <portlet:param name="mvcPath" value="/html/guestbook/view.jsp"></portlet:param>
        </portlet:renderURL>
        
        <portlet:actionURL name="addEntry" var="addEntryURL"></portlet:actionURL>
        
        <aui:form action="<%= addEntryURL %>" name="<portlet:namespace />fm">
                
                <aui:fieldset>
                        <aui:input name="name"></aui:input>
                        <aui:input name="message"></aui:input>
                </aui:fieldset>
                
                <aui:button-row> 
                        <aui:button type="submit"></aui:button> 
                        <aui:button onClick="<%= viewURL.toString() %>" type="cancel"></aui:button>
                </aui:button-row>
        
        </aui:form>
```
3)GuestbookPortlet.java
```
package com.liferay.docs.guestbook.portlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletException;
import javax.portlet.ReadOnlyException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.portlet.ValidatorException;
import javax.portlet.PortletPreferences;

import com.liferay.docs.guestbook.model.Entry;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.util.bridges.mvc.MVCPortlet;

/**
* Portlet implementation class GuestbookPortlet
*/

public class GuestbookPortlet extends MVCPortlet{
    
    //1.
    public void addEntry(ActionRequest request, ActionResponse response) {

        try {

                   PortletPreferences prefs = request.getPreferences();
        
                   String[] guestbookEntries = prefs.getValues("guestbook-entries",new String[1]);
        
                   ArrayList<String> entries = new ArrayList<String>();
        
                   if (guestbookEntries != null) {
        
                     entries = new ArrayList<String>(Arrays.asList(prefs.getValues(
                          "guestbook-entries", new String[1])));

           }

           String userName = ParamUtil.getString(request, "name");
           String message = ParamUtil.getString(request, "message");
           String entry = userName + "^" + message;

           entries.add(entry);

           String[] array = entries.toArray(new String[entries.size()]);

           prefs.setValues("guestbook-entries", array);

                           try {
                
                                   prefs.store();
                
                           } catch (IOException ex) {
                
                                 Logger.getLogger(GuestbookPortlet.class.getName()).log(
                                      Level.SEVERE, null, ex);
                
                           } catch (ValidatorException ex) {
                
                                 Logger.getLogger(GuestbookPortlet.class.getName()).log(
                                      Level.SEVERE, null, ex);
                
                           }

            } catch (ReadOnlyException ex) {
    
               Logger.getLogger(GuestbookPortlet.class.getName()).log(
                  Level.SEVERE, null, ex);
    
            } 
        }
    
        //
    @Override
    public void render (RenderRequest renderRequest, RenderResponse renderResponse) 
            throws PortletException, IOException {

        PortletPreferences prefs = renderRequest.getPreferences();
        String[] guestbookEntries = prefs.getValues("guestbook-entries",
                new String[1]);

        if (guestbookEntries != null) {

            List<Entry> entries = parseEntries(guestbookEntries);

            renderRequest.setAttribute("entries", entries);
        }

        super.render(renderRequest, renderResponse);

    }
    
    //
    private List<Entry> parseEntries (String[] guestbookEntries) {

        ArrayList<Entry> entries = new ArrayList();

        for (String entry : guestbookEntries) {
            String[] parts = entry.split("\\^", 2);
            Entry gbEntry = new Entry(parts[0], parts[1]);
            entries.add(gbEntry);
        }

        return entries;
    }
    
    }
```
4)Entry.java
```
package com.liferay.docs.guestbook.model;

public class Entry {
    
        private String name;
        private String message;
        
        public Entry() {
            this.name=null;
            this.message=null;
        }
        
        public Entry(String name,String message){
            setName(name);
            setMessage(message);
        }
        
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public String getMessage() {
            return message;
        }
        public void setMessage(String message) {
            this.message = message;
        }
        
        
}
```
5. 部署（deploy）到http://localhost:8080：
![](http://static.oschina.net/uploads/img/201602/17090340_E4VK.jpg)

6. 结果：
![](http://static.oschina.net/uploads/space/2016/0217/090200_deDY_2550349.png)

参考:
[https://dev.liferay.com/develop/learning-paths/mvc/-/knowledge_base/6-2/writing-your-first-lifera...](https://dev.liferay.com/develop/learning-paths/mvc/-/knowledge_base/6-2/writing-your-first-lifera...)
