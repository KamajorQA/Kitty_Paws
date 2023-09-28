import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Image, Typography, theme } from 'antd';
import { BiCopy } from 'react-icons/bi';
import { BiSolidCopy } from 'react-icons/bi';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

import { IKittensDataArranged } from '../models/data';
import { catsApi, useUpdateCatLikeMutation } from '../store/services/catsApi';

import { useUserInfo } from './useUserInfo';

import type { TableProps } from 'antd';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';

function useControlTable() {
  const {
    token: { colorPrimaryHover, colorBgLayout },
  } = theme.useToken();

  const { data, isError, isLoading, refetch } = catsApi.useFetchCatsQuery();

  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<IKittensDataArranged>
  >({});

  const navigate = useNavigate();

  const { uid } = useUserInfo();
  const [updateCatLike] = useUpdateCatLikeMutation();

  const handleLike = (catInstance: IKittensDataArranged) => {
    const likedArr = [...catInstance.likes, uid];
    updateCatLike({
      id: catInstance.id,
      catData: { likes: likedArr },
    });
  };

  const handleDislike = (catInstance: IKittensDataArranged) => {
    const unlikedArr = catInstance.likes.filter((el) => el !== uid);
    updateCatLike({
      id: catInstance.id,
      catData: { likes: unlikedArr },
    });
  };

  const handleTableChange: TableProps<IKittensDataArranged>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setSortedInfo(sorter as SorterResult<IKittensDataArranged>);
  };

  const clearCharmSort = () => {
    setSortedInfo({});
  };

  const setCharmSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'charm',
    });
  };

  const columns: ColumnsType<IKittensDataArranged> = [
    {
      title: "Kitty's Name",
      dataIndex: 'title',
      key: 'name',
      render: (text, row) => (
        <Typography.Text
          strong
          onClick={() => navigate(`cats/${row.id}`)}
          style={{
            cursor: 'pointer',
          }}
        >
          {text}
        </Typography.Text>
      ),
    },

    {
      title: 'Characteristics',
      dataIndex: 'brief',
      key: 'brief',
      render: (text) => (
        <Typography.Text
          copyable={{
            icon: [
              <BiCopy
                style={{
                  color: colorBgLayout,
                }}
              />,
              <BiSolidCopy
                style={{
                  color: colorPrimaryHover,
                }}
              />,
            ],
          }}
        >
          {text}
        </Typography.Text>
      ),
      responsive: ['lg'],
    },

    {
      title: 'Post author',
      dataIndex: 'authorName',
      key: 'author',
      responsive: ['xl'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Typography.Paragraph
          ellipsis={{ tooltip: 'Full info is in detailed Bio' }}
          style={{
            width: 100,
            margin: 0,
          }}
        >
          {text}
        </Typography.Paragraph>
      ),
      responsive: ['lg'],
    },
    {
      title: 'Show Bio',
      key: 'bio',
      render: (_, row) => (
        <Button onClick={() => navigate(`cats/${row.id}`)}>Details</Button>
      ),
      responsive: ['xs', 'sm'],
    },

    {
      title: 'Charm',
      dataIndex: 'charm',
      key: 'charm',
      sorter: (a, b) => a.charm - b.charm,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'charm' ? sortedInfo.order : null,
      responsive: ['md'],
    },

    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (src) => <Image src={src} width={150} />,
      responsive: ['sm'],
    },

    {
      title: 'Acttions',
      key: 'actions',
      render: (catInstance) =>
        catInstance?.likes?.includes(uid) ? (
          <Button
            className="flexCenter"
            icon={<FcLike />}
            onClick={() => handleDislike(catInstance)}
          />
        ) : (
          <Button
            className="flexCenter"
            icon={<FcLikePlaceholder />}
            onClick={() => {
              handleLike(catInstance);
            }}
          />
        ),
      responsive: ['xl'],
    },
  ];

  return {
    setCharmSort,
    clearCharmSort,
    handleTableChange,
    columns,
    data,
    isError,
    isLoading,
    refetch,
  };
}

export { useControlTable };
