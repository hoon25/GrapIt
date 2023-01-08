import {createClient} from "@liveblocks/client";
import {createRoomContext} from "@liveblocks/react";

const client = createClient({
    publicApiKey: "pk_dev_wcE8MtQtNsf6RJyIuoFToHngh1UpbI8_DI21CCyxV7UX-bHAsc59m0nO4FYNtE_6",
});

export const {
    suspense: {
        RoomProvider,
        useMyPresence,
        useOthers,
        useUpdateMyPresence,
        useOthersMapped,
        useOthersConnectionIds,
    },
} = createRoomContext(client);

