package com.dairydash.team;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.dairydash.team.dto.TeamMemberRequest;
import com.dairydash.team.entity.TeamMember;
import com.dairydash.team.repository.TeamMemberRepository;
import jakarta.validation.Valid;
@RestController @RequestMapping("/api/v1/team-members")
public class TeamMemberController {
 private final TeamMemberRepository repository;
 public TeamMemberController(TeamMemberRepository repository){this.repository=repository;}
 @GetMapping public List<TeamMember> all(){return repository.findAll();}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public TeamMember create(@Valid @RequestBody TeamMemberRequest request){if(repository.existsByEmailIgnoreCase(request.email().trim()))throw new IllegalArgumentException("A team member with this email already exists.");return repository.save(new TeamMember(request.name().trim(),request.email().trim().toLowerCase(),request.role()));}
 @PutMapping("/{id}") public TeamMember update(@PathVariable Long id,@Valid @RequestBody TeamMemberRequest request){var row=repository.findById(id).orElseThrow(()->new IllegalArgumentException("Team member not found: "+id));String email=request.email().trim().toLowerCase();if(!row.getEmail().equalsIgnoreCase(email)&&repository.existsByEmailIgnoreCase(email))throw new IllegalArgumentException("A team member with this email already exists.");row.setName(request.name().trim());row.setEmail(email);row.setRole(request.role());return repository.save(row);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){if(!repository.existsById(id))throw new IllegalArgumentException("Team member not found: "+id);repository.deleteById(id);}
}
