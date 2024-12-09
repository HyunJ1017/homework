package edu.kh.portpolio.main.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.portpolio.main.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@PropertySource("classpath:config.properties")
@RequiredArgsConstructor
@RequestMapping("main")
@Controller
@Slf4j
public class MainController {
	
	private final MainService service;
	
	@Value("${fontawesome.key}")
	private String fontAwesomeKey;
	
	@GetMapping("")
	public String getMain(Model model) {
		model.addAttribute("fontAwesomeKey", fontAwesomeKey);
		
		Map<String, String> map = service.getVisitCount();
		model.addAttribute("allVisitCount", map.get("allVisitCount"));
		model.addAttribute("weeklyVisitCount", map.get("weeklyVisitCount"));
		
		return "main";
	}

}
