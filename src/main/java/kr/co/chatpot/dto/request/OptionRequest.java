package kr.co.chatpot.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OptionRequest {
    private List<String> ingredients;
    private List<String> option;
}
