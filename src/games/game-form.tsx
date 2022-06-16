import { Field } from "common/components/field"
import { Thumbnail } from "common/components/thumbnail"
import { GameWithMetadata, saveGame } from "firebase-hooks/games"
import { Form, Formik, FormikHelpers, FormikProps } from "formik"
import * as React from "react"
import { useContext } from "react"
import { SelectedGameContext } from "./games-list"

const defaultGame: GameWithMetadata = {
    name: "",
    bggLink: "",
    maxPlayers: 4,
    updateExistingEvents: false,
    timesPlayed: 0,
}

export const GameForm: React.FC = () => {
    const selectedGameContext = useContext(SelectedGameContext)

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={
                    selectedGameContext.selectedGame
                        ? selectedGameContext.selectedGame.data
                        : defaultGame
                }
                onSubmit={handleSubmit}
            >
                {renderForm}
            </Formik>
        </>
    )

    function renderForm(props: FormikProps<GameWithMetadata>) {
        return (
            <Form>
                {/* <h2 className="title">Edit Game</h2> */}
                <Field<GameWithMetadata> name="name" label="Name" type="text" />
                <Field<GameWithMetadata>
                    name="bggLink"
                    label="BGG Link"
                    type="text"
                />
                <Field<GameWithMetadata>
                    name="maxPlayers"
                    label="Max Players"
                    type="number"
                />
                {selectedGameContext.selectedGame && (
                    <Field<GameWithMetadata>
                        name="timesPlayed"
                        label="Times Played"
                        type="number"
                    />
                )}
                {props.values.bggLink && (
                    <figure className="image is-128x128">
                        <Thumbnail url={props.values.bggLink} />
                    </figure>
                )}
                {/* <Field<GameWithMetadata> name="image" label="Image" type="file" component={FileField} /> */}
                {/* <Field<GameWithMetadata> name="updateExistingEvents" label="Update Existing Events?" type="checkbox" checked={props.values.updateExistingEvents || false} /> */}
                <button
                    className="button is-primary"
                    type="submit"
                    disabled={props.isSubmitting}
                >
                    Save
                </button>
            </Form>
        )
    }

    async function handleSubmit(
        values: GameWithMetadata,
        formikHelpers: FormikHelpers<GameWithMetadata>
    ) {
        await saveGame(
            { ...values, timesPlayed: values.timesPlayed || 0 },
            selectedGameContext.selectedGame
                ? selectedGameContext.selectedGame.id
                : ""
        )
        formikHelpers.resetForm({ values: defaultGame })
        selectedGameContext.setSelectedGame(null)
    }
}
GameForm.whyDidYouRender = true
