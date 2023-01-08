import RtcChat from "./RtcChat";
import {ClientSideSuspense} from "@liveblocks/react";
import {
    RoomProvider,
} from "../config/liveblocks.config";
import {useSelector} from "react-redux";

export function CollaborationPage({chat}) {


    const COLORS = [
        ["#FF0099", "#FF7A00"],
        ["#002A95", "#00A0D2"],
        ["#6116FF", "#E32DD1"],
        ["#0EC4D1", "#1BCC00"],
        ["#FF00C3", "#FF3333"],
        ["#00C04D", "#00FFF0"],
        ["#5A2BBE", "#C967EC"],
        ["#46BE2B", "#67EC86"],
        ["#F49300", "#FFE600"],
        ["#F42900", "#FF9000"],
        ["#00FF94", "#0094FF"],
        ["#00FF40", "#1500FF"],
        ["#00FFEA", "#BF00FF"],
        ["#FFD600", "#BF00FF"],
        ["#484559", "#282734"],
        ["#881B9A", "#1D051E"],
        ["#FF00F5", "#00FFD1"],
        ["#9A501B", "#1E0505"],
        ["#FF008A", "#FAFF00"],
        ["#22BC09", "#002B1B"],
        ["#FF0000", "#000000"],
        ["#00FFB2", "#000000"],
        ["#0066FF", "#000000"],
        ["#FA00FF", "#000000"],
        ["#00A3FF", "#000000"],
        ["#00FF94", "#000000"],
        ["#AD00FF", "#000000"],
        ["#F07777", "#4E0073"],
        ["#AC77F0", "#003C73"],
    ];

    let user = useSelector(state => state.user);

    // const [{cursor}] = useMyPresence();

    return (
        <RoomProvider id="1234" initialPresence={{cursor: null,userInfo:{
                name: user.nickName,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            }}}>
            <ClientSideSuspense fallback={<div>Loading...</div>}>
                {() =>
                    <RtcChat chat={chat}/>
                }
            </ClientSideSuspense>
        </RoomProvider>
    );
}



