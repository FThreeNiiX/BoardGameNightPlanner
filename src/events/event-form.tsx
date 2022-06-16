import { Field } from "common/components/field"
import { TimestampField } from "common/components/timestamp-field"
import { saveEvent, useEvent } from "firebase-hooks/events"
import * as firebase from "firebase/app"
import { Form, Formik, FormikHelpers } from "formik"
import { GamesSelect } from "games"
import { Event } from "models"
import * as React from "react"
import { RouteComponentProps } from "react-router"
import { UserSelect } from "users/user-select"

const defaultEvent: Event = {
    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    attendees: {},
    host: null,
    game: {
        id: "",
        data: {
            name: "",
            bggLink: "",
            maxPlayers: 4,
        },
    },
}

export const EventForm: React.FC<RouteComponentProps<{ id?: string }>> = (
    props
) => {
    let event: Event = defaultEvent

    const eventDoc = useEvent(props.match.params.id)
    if (props.match.params.id !== undefined) {
        if (eventDoc === null) {
            return <></>
        } else {
            event = eventDoc.data
        }
    }

    return (
        <Formik<Event>
            enableReinitialize={true}
            initialValues={event}
            onSubmit={handleSubmit}
        >
            <Form>
                <h2 className="title">Edit Event</h2>
                <TimestampField<Event> name="timestamp" label="Timestamp" />
                <Field<Event>
                    name="game"
                    label="Game"
                    type="file"
                    component={GamesSelect}
                />
                <Field<Event>
                    name="host"
                    label="Host"
                    type="file"
                    component={UserSelect}
                />
                <button className="button is-primary" type="submit">
                    Save
                </button>
            </Form>
        </Formik>
    )

    async function handleSubmit(
        values: Event,
        formikHelpers: FormikHelpers<Event>
    ) {
        await saveEvent(props.match.params.id, values)
        formikHelpers.resetForm({ values: defaultEvent })
    }
}
EventForm.whyDidYouRender = false
