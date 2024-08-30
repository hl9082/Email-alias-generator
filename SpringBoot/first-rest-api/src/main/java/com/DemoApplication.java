package com;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication implements ApplicationRunner  {

	private static final Logger LOG = LoggerFactory
         .getLogger(DemoApplication.class);

	public static void main(String[] args) {
		LOG.info("STARTING : Spring boot application starting");

		SpringApplication.run(DemoApplication.class, args);

		LOG.info("STOPPED  : Spring boot application stopped");

	}

    @Override
    public void run(ApplicationArguments  args) throws Exception {
        //throw new UnsupportedOperationException("Not supported yet.");
		LOG.info("EXECUTING : command line runner");
		/** 
        for(int i=0;i<=10;i++){
            LOG.info("Count ="+i);
        }**/
		final List nonOptionArgs = args.getNonOptionArgs();
  final String [] sourceArgs = args.getSourceArgs();
  final Set  optionNames = args.getOptionNames();

  nonOptionArgs.forEach(nonOption -> LOG.info("## Non Option Args : "+nonOption));
  optionNames.forEach(option -> LOG.info("## Option Names    : "+option));
  Arrays.stream(sourceArgs).forEach(srcArgs ->LOG.info("## Source Args     : "+srcArgs));
  LOG.info("## Option Value of --optionalArg1 : "+args.getOptionValues("optionalArg1"));
  LOG.info("## Option Value of --optionalArg2 : "+args.getOptionValues("optionalArg2"));

    }

    
	/**

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx){
		return args->{
			System.out.println("Let's inspect the beans provided by Spring Boot");
			String [] beanNames=ctx.getBeanDefinitionNames();
			for(String beanName:beanNames){
				System.out.println(beanName);
			}
		};
	}**/

}
