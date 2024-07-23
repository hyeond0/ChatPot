package kr.co.chatpot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "foods")
@Getter
@NoArgsConstructor
public class Food extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private Long id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "emoji", length = 10)
    private String emoji;

    @Column(name = "selected_count")
    private int selectedCount;

    @ManyToOne(fetch = FetchType.LAZY)
    private FoodCategory category;

    @Builder
    public Food(String name, String emoji, FoodCategory category) {
        this.name = name;
        this.emoji = emoji;
        this.category = category;
        this.selectedCount = 0;
    }

    public void increaseSelectedCount() {
        this.selectedCount++;
    }

    public void updateEmoji() {
        this.emoji = emoji;
    }
}
