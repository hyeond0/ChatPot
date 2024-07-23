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
@Table(name = "option_recipe")
@Getter
@NoArgsConstructor
public class OptionRecipe extends CreatedTimeEntity {
    @EmbeddedId
    private Pk pk;

    @ManyToOne(fetch = FetchType.LAZY)
    private Option option;

    @ManyToOne(fetch = FetchType.LAZY)
    private Recipe recipe;

    @Builder
    public OptionRecipe(Option option, Recipe recipe) {
        this.option = option;
        this.recipe = recipe;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    @Embeddable
    public static class Pk implements Serializable {
        @Column(name = "recipe_id")
        private Long recipeId;
        @Column(name = "option_id")
        private Long optionId;
    }
}
