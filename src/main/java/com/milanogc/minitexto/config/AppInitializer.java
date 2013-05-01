package com.milanogc.minitexto.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import com.milanogc.minitexto.servlet.BroadcastServlet;

public class AppInitializer implements WebApplicationInitializer {
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		AnnotationConfigWebApplicationContext rootCtx = new AnnotationConfigWebApplicationContext();
		rootCtx.register(JpaRepositoryConfig.class, ServiceConfig.class);
		servletContext.addListener(new ContextLoaderListener(rootCtx));

		ServletRegistration.Dynamic regAdvisor = servletContext.addServlet("advisor", new BroadcastServlet());
		regAdvisor.setLoadOnStartup(1);
		regAdvisor.addMapping("/websocket/broadcast");

		AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
		webCtx.register(DispatcherConfig.class);
		ServletRegistration.Dynamic regDispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(webCtx));
		regDispatcher.setLoadOnStartup(2);
		regDispatcher.addMapping("/");
	}
}