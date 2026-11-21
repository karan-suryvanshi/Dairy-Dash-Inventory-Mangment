package com.dairydash.team.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.dairydash.team.entity.TeamMember;
public interface TeamMemberRepository extends JpaRepository<TeamMember,Long> { boolean existsByEmailIgnoreCase(String email); }
