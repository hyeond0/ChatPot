package kr.co.chatpot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recipes")
@Getter
@NoArgsConstructor
public class Recipe extends CreatedTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long id;

    @Column(length = 50)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    @Column(columnDefinition = "TEXT")
    private String ingredients;

    @Column(name = "cooking_sequence", columnDefinition = "TEXT")
    private String cookingSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Recipe parent;

    @OneToMany(mappedBy = "parent")
    private List<Recipe> child = new ArrayList<>();

    @Builder
    public Recipe(
            String name,
            String introduction,
            String ingredients,
            String cookingSequence
    ) {
        this.name = name;
        this.introduction = introduction;
        this.ingredients = ingredients;
        this.cookingSequence = cookingSequence;
    }

    public void addChild(Recipe recipe) {
        this.child.add(recipe);
        recipe.setParent(this);
    }

    private void setParent(Recipe recipe) {
        this.parent = recipe;
    }
}
