package edu.kh.portpolio.main.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.portpolio.main.dto.Comment;
import edu.kh.portpolio.main.dto.ThemeDto;
import edu.kh.portpolio.main.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@SessionAttributes({"theme", "visitor"})
@PropertySource("classpath:config.properties")
@RequiredArgsConstructor
@RequestMapping("main")
@Controller
@Slf4j
public class MainController {
	
	private final MainService service;
	private static int seqNum = 1;
	
	@Value("${fontawesome.key}")
	private String fontAwesomeKey;
	
	@GetMapping("")
	public String getMain(
			@SessionAttribute(name = "theme", required = false) ThemeDto theme,
			@SessionAttribute(name = "visitor", required = false) String visitor,
			Model model) {
		
		if(theme == null) {
			theme = theme.builder().
					backgroundColor("black").
					color("white").
					linkColor("white").
					borderColor("white").
					build();
			model.addAttribute("theme", theme);
		}
		log.info("visitor : {}", visitor);
		if(visitor == null) {
			// 현재 날짜 가져오기
	        LocalDate currentDate = LocalDate.now();
	        
	        // 연도, 월, 일 추출
	        int year = currentDate.getYear();
	        int month = currentDate.getMonthValue();
	        int day = currentDate.getDayOfMonth();
	        String code = "";
	        int num = seqNum;
	        for(int i = 0; i < 3 ; i++) {
	        	if(num < 1) {
	        		code += "0";
	        	}
	        	num /= 10;
	        }
	        log.info("year : {}, month : {}, day : {}, code : {}", year, month, day, code);
	        	
			visitor = year + "" + month + "" + day + "" + code  + seqNum;
			seqNum++;
			model.addAttribute("visitor", visitor);
		}
		log.info("visitor : {}", visitor);
		
		model.addAttribute("fontAwesomeKey", fontAwesomeKey);
		
		Map<String, String> map = service.getVisitCount();
		model.addAttribute("allVisitCount", map.get("allVisitCount"));
		model.addAttribute("weeklyVisitCount", map.get("weeklyVisitCount"));
		
		return "main";
	}
	
	@GetMapping("theme")
	@ResponseBody
	public ThemeDto changeTheme(
			@RequestParam("theme") String theme,
			@RequestParam("type") String thype,
			@SessionAttribute("theme") ThemeDto pageTheme,
			Model model) {
		
		if(theme.equals("theme")) {
			if(thype.equals("black")) {
				pageTheme.setBackgroundColor("black");
				pageTheme.setBorderColor("white");
				pageTheme.setColor("white");
			} else if(thype.equals("white")) {
				pageTheme.setBackgroundColor("white");
				pageTheme.setBorderColor("black");
				pageTheme.setColor("black");
			}
		}
		model.addAttribute("theme", pageTheme);
		return pageTheme;
	}
	
	@GetMapping("getComments")
	@ResponseBody
	public List<Comment> getComments() {
		return service.getComments();
	}
	
	@PostMapping("writeComment")
	@ResponseBody
	public Map<String, Object> writeComment(
			@RequestBody Comment comment) {
		
		log.info("comment : {}", comment);
		Comment result = service.writeComment(comment);
		int code = 0;
		if(result != null) {
			code = 1;
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("comment", result);
		map.put("code", code);
		
		return map;
	}

}
