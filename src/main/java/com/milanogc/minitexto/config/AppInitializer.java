package com.milanogc.minitexto.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class AppInitializer implements WebApplicationInitializer {
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		AnnotationConfigWebApplicationContext rootCtx = new AnnotationConfigWebApplicationContext();
		rootCtx.register(JpaRepositoryConfig.class);
		servletContext.addListener(new ContextLoaderListener(rootCtx));
		
		AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
		webCtx.register(DispatcherConfig.class);
		ServletRegistration.Dynamic reg = servletContext.addServlet("dispatcher", new DispatcherServlet(webCtx));
		reg.setLoadOnStartup(1);
		reg.addMapping("/");
	}
}