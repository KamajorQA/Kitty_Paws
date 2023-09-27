import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { db } from '../../firebase';
import { IKittensData, IKittensDataArranged } from '../../models/data';

export const catsApi = createApi({
  reducerPath: 'catsApi',
  // для использования Third-Party SDK Firebase необходимо использовать fakeBaseQuery вмето fetchBaseQuery
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Cats'],
  endpoints: (builder) => ({
    /**
     * Получение списка всех котов в обработанном виде
     * @returns {array} Returns array of cats.
     */
    fetchCats: builder.query<IKittensData[], void>({
      // а с fakeBaseQuery вместо простого получения query использую queryFn
      async queryFn() {
        const catsCollectionRef = collection(db, 'cats');
        const catsQuerySnaphot = await getDocs(catsCollectionRef);
        const posts = catsQuerySnaphot.docs.map((document) => ({
          // typescript не видит структуру при краткой деструктуризации а-ля...document.data(),
          // поэтому приходится разворачивать вручную
          title: document.data().title,
          image: document.data().image,
          author: document.data().author,
          likes: document.data().likes,
          description: document.data().description,
          brief: document.data().brief,
          id: document.id,
        }));

        return {
          // поскольку используется queryFn, то использование transformResponse как в query недоступно
          // соответственно трансформацию произвожу при присвоении ответа возвращаемому полю data
          data: posts.map((e: IKittensData) => ({
            ...e,
            authorName: e.author.name,
            charm: e.likes.length,
          })) as IKittensDataArranged[],
        };
      },
      providesTags: ['Cats'],
    }),
    /**
     * Получение одного кота по переданному ID
     * @param {string} id cats id as a string
     * @returns {object} Returns signle cat object.
     */
    fetchSingleCat: builder.query<IKittensData, string>({
      async queryFn(id) {
        try {
          const catDocRef = doc(db, 'cats', id);
          const catSnapshot = await getDoc(catDocRef);
          const signleCat = {
            id: catSnapshot.id,
            ...catSnapshot.data(),
          };
          return { data: signleCat as IKittensData };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Cats'],
    }),
  }),
});

export const { useFetchCatsQuery, useFetchSingleCatQuery } = catsApi;
