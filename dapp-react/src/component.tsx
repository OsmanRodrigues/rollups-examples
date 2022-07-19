import { FC } from "react";
import styled from "styled-components";

const people = [
    {
        name: 'Calvin Hawkins',
        email: 'calvin.hawkins@example.com',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Kristen Ramos',
        email: 'kristen.ramos@example.com',
        image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
];

export const Example: FC<{data: any[]}> = ({ data = [] }) => {
    const mergedData = data.map((item: any, index) => {
        const parsedIndex = index % 2 === 0 ? 0 : 1;

        return {
            ...people[parsedIndex],
            message: item.payload_parsed,
            id: `${people[parsedIndex].email}_${index}`
        };
    })

    return (
        <ul className="divide-y divide-gray-200">
            {mergedData.length
                ? mergedData.map((person) => (
                      <li key={person.id} className="py-4 flex">
                          <img
                              className="h-10 w-10 rounded-full"
                              src={person.image}
                              alt=""
                          />
                          <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                  {person.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                  {person.email}
                              </p>
                              <p className="text-sm text-gray-900">
                                  "{person.message}"
                              </p>
                          </div>
                      </li>
                  ))
                : null}
        </ul>
    );
}

export const MessageForm: FC<{onSubmit: (e: any)=> void}> = ({onSubmit}) => {
    return (
        <form className="flex flex-col items-start" onSubmit={onSubmit}>
            <label htmlFor="messageInput">Send message</label>
            <input id="messageInput" type="text" />
            <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
            >
                Send
            </button>
        </form>
    );
}

export const Heading = styled.h1`
    text-decoration: underline;
`
