package edu.kh.portpolio.main.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@PropertySource("classpath:config.properties")
@RequestMapping("main")
@Controller
@Slf4j
public class MainController {
	
	@Value("${fontawesome.key}")
	private String fontAwesomeKey;
	
	@GetMapping("")
	public String getMain(Model model) {
		model.addAttribute("fontAwesomeKey", fontAwesomeKey);
		return "main";
	}

}
