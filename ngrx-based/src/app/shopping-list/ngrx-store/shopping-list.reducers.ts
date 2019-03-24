import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface ShoppingListState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
    ingredients : [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, // Maintain the existting state
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
                // Add new Ingredient to the ingredients atttribute by first retaining the existing ingredients
                // and then adding the new ingredient sent as a partt of payload of ShoppingListActions
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...(action.payload as Ingredient[])
                ]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            return {
                ...state,
                ingredients: updateIngredient(state.ingredients, state.editedIngredientIndex, action.payload as Ingredient)
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            const data = {
                ...state,
                ingredients: deleteIngredient(state.ingredients, state.editedIngredientIndex)
            };
            return data;
        case ShoppingListActions.START_EDIT_INGREDIENT:
            return {
                ...state,
                editedIngredient: { ...state.ingredients[(action.payload as number)] },
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT_INGREDIENT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default: return state;
    }
}

function updateIngredient(ingredients: Ingredient[], index: number, updatedIngredient: Ingredient) {
    ingredients[index] = updatedIngredient;
    return ingredients.slice();
}

function deleteIngredient(ingredients: Ingredient[], index: number) {
    ingredients.splice(index, 1);
    return ingredients.slice();
}

