package edu.kh.portpolio.main.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeDto {
	private String backgroundColor;
	private String color;
	private String linkColor;
	private String borderColor;
}
