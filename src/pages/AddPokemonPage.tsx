export const AddPokemonPage = () => {

    return (
    <>
        <h1>Add Pokemon</h1>
        <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formElement = form.elements as typeof form.elements & {

                name: {value: string}
                types: {value: string}
                image: {value: string}

            }
            const baseUrl = "https://pokeapi.co/api/v2/";
            fetch(baseUrl + "pokemon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formElement.name.value,
                    image: formElement.image.value,
                    types: formElement.types.value.split(",").map((type: string) => {
                        return {
                            type: {
                                name: type
                            }
                        }
                    })

                })
            })

            console.log(formElement.name.value);
        }}>
            <label>
                Name:
                <input type="text" name="name"/>
            </label>
            <br/>
            <label>
                Types:
                <input type="text" name="types"/>
            </label>
            <br/>
            <label>
                Image URL:
                <input type="url" name="image"/>
            </label>
            <button type="submit">Add Pokemon</button>
        </form>
    </>
    )
};
