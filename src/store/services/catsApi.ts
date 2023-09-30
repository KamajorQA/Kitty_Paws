import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

import { db, auth } from '../../firebase';
import {
  IKittensData,
  IKittensDataArranged,
  INewCatData,
} from '../../models/data';

const catsCollectionRef = collection(db, 'cats');

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
    fetchCats: builder.query<IKittensDataArranged[], void>({
      // а с fakeBaseQuery вместо простого получения query использую queryFn
      async queryFn() {
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
    fetchFavorites: builder.query<IKittensData[], void>({
      async queryFn() {
        try {
          const q = query(
            catsCollectionRef,
            where('likes', 'array-contains', auth.currentUser?.uid)
          );
          const favoritesQuerySnaphot = await getDocs(q);
          const favoritesArray = favoritesQuerySnaphot.docs.map((document) => ({
            ...document.data(),
            id: document.id,
          }));

          return { data: favoritesArray as IKittensData[] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Cats'],
    }),
    updateCatLike: builder.mutation<
      string,
      { id: string; catData: { likes: string[] } }
    >({
      async queryFn({ id, catData }) {
        try {
          const catDocRef = doc(db, 'cats', id);
          await setDoc(catDocRef, catData, { merge: true });
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Cats'],
    }),
    addNewCat: builder.mutation<string, INewCatData>({
      async queryFn(values) {
        try {
          await addDoc(catsCollectionRef, {
            ...values,
            author: {
              name: auth.currentUser?.displayName,
              uid: auth.currentUser?.uid,
            },
            likes: [],
          });
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Cats'],
    }),
    deleteCat: builder.mutation<string, string>({
      async queryFn(id) {
        try {
          const catDocRef = doc(db, 'cats', id);
          await deleteDoc(catDocRef);
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Cats'],
    }),
  }),
});

export const {
  useFetchCatsQuery,
  useFetchSingleCatQuery,
  useUpdateCatLikeMutation,
  useAddNewCatMutation,
  useDeleteCatMutation,
  useFetchFavoritesQuery,
} = catsApi;
