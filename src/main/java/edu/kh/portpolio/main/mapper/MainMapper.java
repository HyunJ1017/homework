package edu.kh.portpolio.main.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MainMapper {

	int insertCount();

	String selectAllVisitCount();

	String selectWeeklyVisitCount();

}
