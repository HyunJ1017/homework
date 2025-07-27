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
	private String backgroundColor2;
	private String backgroundColor3;
	private String color;
	private String color2;
	private String color3;
	private String linkColor;
	private String borderColor;
	private String borderColor2;
	private String borderColorTop;
	private String borderColorBottom;
	private String borderColorSide;
	private String tableBorderColor;
	private String sliderBorderColor;
	private String sliderBorderColor2;
}
