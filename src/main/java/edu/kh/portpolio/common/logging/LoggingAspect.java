package edu.kh.portpolio.common.logging;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@PropertySource("classpath:config.properties")
@Component
@Aspect
@Slf4j
public class LoggingAspect {
	
	@Value("${developer.desktop.ip}")
	private String commonIp;
	
	// 모든 컨트롤러 수행 전에 로그 출력
	@Before("PointCutBundle.controllerPointcut()")
	public void beforeController(JoinPoint jp) {
		
		String calssName = jp.getTarget().getClass().getSimpleName();
		String methodName = jp.getSignature().getName() + "()";
		
		HttpServletRequest req = ( (ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes() )
					.getRequest();
		
		String clientIp = getRemoteAddr(req);
		
		log.info(">> =======================================================================================");
		
		StringBuilder sb = new StringBuilder();
		
		if(clientIp.equals(commonIp) || clientIp.equals("0:0:0:0:0:0:0:1") || clientIp.equals("127.0.0.1")) {
			sb.append( String.format("[개발자요청] ip : %s", clientIp ));
		} else {
			sb.append( String.format("[방문자요청] ip : %s", clientIp ));
		}
		
		
		
		sb.append( String.format(".    > %s.%s ", calssName, methodName ) );
		
		log.info(sb.toString());
	}
	

	@Around("PointCutBundle.serviceImplPointcut()")
	public Object aroundServiceImpl(ProceedingJoinPoint pjp) throws Throwable {
		
		/* Before */
		String className = pjp.getTarget().getClass().getSimpleName();
		String methodName = pjp.getSignature().getName() + "()";
		String parameter = Arrays.toString( pjp.getArgs() );
		
		log.info("[호출] {}, {}", className, methodName);
		log.info(".    > parameter : {}", parameter);
		
		long startMs = System.currentTimeMillis();
		
		Object obj = pjp.proceed();
		
		/* after */
		
		long endMs = System.currentTimeMillis();
		
		long delay = endMs - startMs;
		
		log.info("Running Time : {}ms",delay);
		
		log.info(">> ---------------------------------------------------------------------------------------");
		
		return obj;
	}
	
	
	// ---------------------------------------------------------------------
	
	/** @Transactional 어노테이션 롤백 동작 후 수행
	 * 사용 조건 : 서비스 메서드 레벨로 @Transactional이 작성되어야 동작함
	 * @param jp
	 * @param ex
	 */
	// 예외 발생 후 수행되는 코드
	@AfterThrowing(pointcut = "@annotation(org.springframework.transaction.annotation.Transactional)", 
				   throwing = "ex")
	public void transactionRollback(JoinPoint jp, Throwable ex) {
		log.info ("***** [[ 트랜잭션이 롤백됨 {} ]] *****", jp.getSignature().getName());
		log.error("[롤백 원인] : {}", ex.getMessage());
	}	
	
	
	/** 접속자 IP 얻어오는 메서드
	 * @param request
	 * @return ip
	 */
	private String getRemoteAddr(HttpServletRequest request) {

		String ip = null;

		ip = request.getHeader("X-Forwarded-For");

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-Real-IP");
		}

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-RealIP");
		}

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("REMOTE_ADDR");
		}

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}

		return ip;
	}
	

}
