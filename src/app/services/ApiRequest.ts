import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
import { setLoading } from "@app/store/reducers/ui";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { deleteByPath } from "./main.service";
import { API_PATH } from "./_path.service";



/** DELETE HANDLING */
interface IdeleteData {
    dataSelected: any
    path: string
    primaryKey: string
    label: string
    source: any
}
export const deleteData = async ({
    dataSelected,
    path,
    primaryKey,
    source,
    label

}: IdeleteData) => {
    setLoading(true);

    try {
        await deleteByPath(get(API_PATH(), path), dataSelected[primaryKey], source.token);
        // dispatchNotification(`Sukses menghapus data ${label}`, 'success');
    } catch (err: any) {
        setLoading(false);
        // dispatchNotification(`Failed menghapus data ${label}`, 'danger');
    }
};
