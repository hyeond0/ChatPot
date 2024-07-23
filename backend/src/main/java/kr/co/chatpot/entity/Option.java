package kr.co.chatpot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "options")
public class Option extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "option_id")
    private Long id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "selected_count")
    private int selectedCount;

    @Builder
    public Option(String name) {
        this.name = name;
        this.selectedCount = 0;
    }

    public void increaseSelectedCount() {
        this.selectedCount++;
    }
}
