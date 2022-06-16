import { ObjectSelectField } from "common/components/object-select-field"
import { useUsers } from "firebase-hooks/users"
import * as Formik from "formik"
import { Document, User } from "models"
import * as React from "react"

type UserSelectProps = Formik.FieldProps<Document<User>> &
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "form">

export const UserSelect: React.FC<UserSelectProps> = (
    props: UserSelectProps
): JSX.Element => {
    const [users] = useUsers()

    return users.length > 0 ? (
        <ObjectSelectField<Document<User>>
            values={users}
            keySelector={userKeySelector}
            labelSelector={userLabelSelector}
            {...props}
        />
    ) : (
        <></>
    )

    function userKeySelector(user: Document<User>) {
        return user?.id
    }

    function userLabelSelector(user: Document<User>) {
        return user.data.displayName || user.data.email || ""
    }
}
UserSelect.whyDidYouRender = false
