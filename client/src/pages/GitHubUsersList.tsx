import { useEffect, useState, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import debounce from 'lodash.debounce';
import { CounterDisplay } from '../components/CounterDisplay/CounterDisplay';
import { GitHubUser } from '../entities/gitHubUser';
import { searchUsers } from '../services/GitHubService';
import { GitHubUserCard } from '../components/GitHubUserCard/GitHubUserCard';

export const GitHubUsersList: React.FC = () => {
  const [gitHubUsersList, setGitHubUsersList] = useState<GitHubUser[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNumber: number, query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const { data, totalCount, pageInfo } = await searchUsers(
        query,
        pageNumber
      );
      setHasMore(pageInfo.hasNextPage);
      setGitHubUsersList((prevUsers) => [...prevUsers, ...data]);
      setTotalResults(totalCount);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchHandler = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setGitHubUsersList([]);
        setPage(1);
        setHasMore(true);
        setTotalResults(0);
        fetchData(1, value);
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchHandler(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [debouncedSearchHandler]);

  useEffect(() => {
    if (page > 1 && search) {
      fetchData(page, search);
    }
  }, [page, search]);

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white z-10 p-4 shadow-md">
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Search GitHub users..."
          className="w-full p-2 border rounded"
        />
      </div>
      {search && (
        <div className="pt-4">
          <CounterDisplay
            title="Total results"
            count={totalResults}
            className="text-lg"
          />
        </div>
      )}
      <InfiniteScroll
        dataLength={gitHubUsersList.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore && !loading}
        loader={<h4></h4>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {loading && gitHubUsersList.length === 0 ? (
            <h4>Loading...</h4>
          ) : search ? (
            gitHubUsersList.length > 0 ? (
              gitHubUsersList.map((user) => (
                <GitHubUserCard key={user.username} user={user} />
              ))
            ) : (
              <div>No results found for '{search}'.</div>
            )
          ) : (
            <div>Please enter a search term.</div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};
