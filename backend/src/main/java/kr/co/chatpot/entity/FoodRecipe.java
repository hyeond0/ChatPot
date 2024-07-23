package kr.co.chatpot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "food_recipe")
@Getter
@NoArgsConstructor
public class FoodRecipe extends CreatedTimeEntity {
    @EmbeddedId
    private Pk pk;

    @ManyToOne(fetch = FetchType.LAZY)
    private Food food;

    @ManyToOne(fetch = FetchType.LAZY)
    private Recipe recipe;

    @Builder
    public FoodRecipe(Food food, Recipe recipe) {
        this.food = food;
        this.recipe = recipe;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    @Embeddable
    public static class Pk implements Serializable {
        @Column(name = "recipe_id")
        private Long recipeId;
        @Column(name = "food_id")
        private Long foodId;
    }
}
