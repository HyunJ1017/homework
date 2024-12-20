package edu.kh.portpolio.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.portpolio.main.dto.Comment;
import edu.kh.portpolio.main.mapper.MainMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {
	
	private final MainMapper mapper;

	@Override
	public Map<String, String> getVisitCount() {
		
		String allVisitCount;
		String weeklyVisitCount;
		
		int result = mapper.insertCount();
		
		if(result > 0) {
			Map<String, String> map = new HashMap<>();
			allVisitCount = mapper.selectAllVisitCount();
			weeklyVisitCount = mapper.selectWeeklyVisitCount();
			map.put("allVisitCount", allVisitCount);
			map.put("weeklyVisitCount", weeklyVisitCount);
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
