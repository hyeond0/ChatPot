package kr.co.chatpot.dto.request;

import java.util.List;
import kr.co.chatpot.dto.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReRecipeRequest {
    private List<Message> messages;
}
