package edu.kh.portpolio;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("")
@Controller
public class StartController {
	
	@GetMapping("")
	public String redirectMain() {
		return "redirect:/main";
	}

}
