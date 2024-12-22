package edu.kh.portpolio.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.portpolio.main.dto.Comment;

@Mapper
public interface MainMapper {

	int insertCount();

	String selectAllVisitCount();

	String selectWeeklyVisitCount();

	int writeComment(Comment comment);

	List<Comment> getComments();

	Comment selectComment(Comment comment);

	String getOracleTime();

}
