package edu.kh.portpolio.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.portpolio.main.dto.Comment;
import edu.kh.portpolio.main.mapper.MainMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {
	
	private final MainMapper mapper;

	@Override
	public Map<String, String> getVisitCount() {
		
		String allVisitCount;
		String weeklyVisitCount;
		
		int result = mapper.insertCount();
		Map<String, String> map = new HashMap<>();
		map.put("oracleTime", mapper.getOracleTime());
		
		if(result > 0) {
			allVisitCount = mapper.selectAllVisitCount();
			weeklyVisitCount = mapper.selectWeeklyVisitCount();
			map.put("allVisitCount", allVisitCount);
			map.put("weeklyVisitCount", weeklyVisitCount);
			log.info("[요청정보] allVisitCount : {}", allVisitCount);
			log.info("[요청정보] weeklyVisitCount : {}", weeklyVisitCount);
			return map;
		}
		
		return null;
	}

	@Override
	public List<Comment> getComments() {
		return mapper.getComments();
	}

	@Override
	public Comment writeComment(Comment comment) {
		
		int result = mapper.writeComment(comment);
		
		if(result > 0) {
			return mapper.selectComment(comment);
		}
		return null;
	}

}
