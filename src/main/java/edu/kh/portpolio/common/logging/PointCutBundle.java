package edu.kh.portpolio.common.logging;

import org.aspectj.lang.annotation.Pointcut;

public class PointCutBundle {

	// 모든 컨트롤러 지정
	@Pointcut("execution(* edu.kh.portpolio..*Controller*.*(..))")
	public void controllerPointcut() {}
	
	// 모든 ServiceImpl 지정
	@Pointcut("execution(* edu.kh.portpolio..*ServiceImpl*.*(..))")
	public void serviceImplPointcut() {}
	
}
