package edu.kh.portpolio.main.service;

import java.util.List;
import java.util.Map;

import edu.kh.portpolio.main.dto.Comment;

public interface MainService {

	Map<String, String> getVisitCount();

	List<Comment> getComments();

	Comment writeComment(Comment comment);

}
