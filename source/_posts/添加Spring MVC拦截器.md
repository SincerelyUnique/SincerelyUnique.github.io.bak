---
title: 添加Spring MVC拦截器
date: 2017-08-1 10:38:10
tags: 
categories: Spring
---

>使用场景：通常我们需要对每一个请求进行过滤，比如权限或者是登录状态（token），此时我们不必再每个请求中传递token和username这两个参数，可以将其放在HttpServletRequest对象，然后从中获取，再使用spring mvc的拦截器进行验证，成功则返回true。

1.下面我们以token拦截器为例：创建拦截器TokenInterceptor.java
```
package com.a.b.common.web.interceptor;

import com.a.b.common.util.AccessRestProxy;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * token登录拦截器
 * <p>
 * <code>HandlerInterceptorAdapter</code>
 * </p>
 *
 * @author Mcchu
 * @version 1.0 @date 2017-07-27
 * @since 1.0
 */
public class TokenInterceptor extends HandlerInterceptorAdapter {

    private static final Log log = LogFactory.getLog(TokenInterceptor.class);

    private static final String NO_AUTHORITY_ACTION = "/tokenInvalid";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        String userAccount=request.getParameter("userAccount");
        String token=request.getParameter("token");
        Boolean hasToken = AccessRestProxy.hasToken(userAccount,token);
        if (hasToken){
            log.info("token验证通过");
            return true;
        }else {
            response.sendRedirect(request.getContextPath() + NO_AUTHORITY_ACTION);
            log.info("token验证失败，没有权限");
            return false;
        }
    }

}
```
2.token验证失败重定向到一个返回失败信息的请求路径：
```
    /**
     * Token验证失败返回信息
     * @return
     */
    @GetMapping("/tokenInvalid")
    @ResponseBody
    public ResponseEntity<ResponseVo<String>> noTokenAuthority(){
        ResponseVo<String> responseVo = new ResponseVo<>("false", GpsMsgKey.getTipMsg("no_authority"), "Token验证失败，请重新登陆");
        ResponseEntity<ResponseVo<String>> responseEntity = new ResponseEntity<ResponseVo<String>>(responseVo, HttpStatus.OK);
        return responseEntity;
    }
```
3.mvc拦截器设置，spring mvc配置文件里：
```
	<mvc:interceptors>
		<mvc:interceptor>
			<mvc:mapping path="/gps/setting/getGPSSetting"/>
			<mvc:mapping path="/gpsDateCtl/uploadGPS/"/>
			<mvc:mapping path="/gps/law/getLaw"/>
			<mvc:mapping path="/gps/user/setting/isValidGPS"/>
			<mvc:exclude-mapping path="/resources/**" />
			<bean class="com.a.b.common.web.interceptor.TokenInterceptor" />
		</mvc:interceptor>-->
	</mvc:interceptors>
```