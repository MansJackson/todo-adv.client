import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsLoadingA } from '../actions';
import { List, ListProps, RootState } from '../types';
import NotFound from './NotFound';

const ListPage: React.FunctionComponent<ListProps> = (props): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<List | null>(null);
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/lists/${id}`, { credentials: 'include' })
      .then((res) => {
        if (res.status === 401) setErr(true);
        else if (res.status === 204) setErr(true);
        else if (res.status === 200) return res.json();
        return false;
      })
      .then((data: { list: List } | false) => {
        if (data) setListData(data.list);
        setIsLoading(false);
      })
      .catch(() => {
        setErr(true);
        setIsLoading(false);
      });
  }, [id, setIsLoading]);

  if (isLoading) return <p>Loading...</p>;
  if (err || !listData) return <NotFound />;

  const { title, items } = listData;

  return (
    <div>
      <h1>{title}</h1>
      {items && items.length
        ? items.map((el) => <p>{el}</p>)
        : <p>no items yet</p>}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, {
  setIsLoading: setIsLoadingA,
})(ListPage);
