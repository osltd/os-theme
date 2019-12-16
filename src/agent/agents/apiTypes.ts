import {Canceler} from "axios";

export type ApiSucessfulResponse = {
    result: boolean,
    data?: any,
} & any

export type ApiFailedResponse = {
    result: boolean,
    message: string[]
} & any

export type CancellerSetter = (canceller: Canceler) => any

export type GetFeedsParams = {
    ids?: string,
    status?: string,
    tags?: string,
    page?: number,
}

export type Section = {
    title: string,
    description: string,
    medias: string | string[],
}

export type Feed = {
    id: number,
    tags: string,
    status: 'Draft' | 'Published',
    createdTime: string,
    updatedTime: string,
    publishTime: string,
    sections: (Section | any)[],
}

export type GetFeedsResponse = {
    result: boolean,
    data: {
        total: number,
        feeds: Feed[],
    }
}

export type CreateOrUpdateFeedResponse = {
    result: boolean,
    data: {
        total: number,
        feeds: { id: number }[],
    }
} & any

export type RemoveFeedResponse = {
    result: boolean,
    messages: string[],
} & any

export type PostFeedBody = {
    shops: string | { [key: string]: string | number }, //TODO: Verify 'shops' type later when API is stable
    tags?: string,
    status?: 'Draft' | 'Published'
    createdTime?: string,
    updatedTime?: string,
    publishTime?: string,
    sections: any[], //{title: string, description?: string, medias?: string | string[]}[],
}