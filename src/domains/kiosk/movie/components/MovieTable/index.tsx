import { useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
import { movieList } from "utils/constants";
import {
  setIsViewTotalMovie,
  setSelectMovie
} from "features/kiosk/movieKioskSlice";
import { ICurrentMovie } from "features/types/movieSliceType";
import { IComponentRoute } from "features/types/commonSliceType";
import usePopup from "hooks/usePopup";

const Index = ({ next }: IComponentRoute) => {
  const dispatch = useDispatch();
  const { handlePopup } = usePopup();
  const { isViewTotalMovie, currentTime } = useSelectorTyped(state => ({
    isViewTotalMovie: state.movieKiosk.isViewTotalMovie,
    currentTime: state.common.currentTime
  }));

  useEffect(() => {
    handlePopup("common/Alert", "", {
      desc: !isViewTotalMovie
        ? "<div>전체상영 시간표<br /> 보러가기를<br /> 누르세요!</div>"
        : `${timeFilterMovieList[0].startAt}시 영화를 클릭하세요!`
    });
  }, [isViewTotalMovie]);

  const timeFilterMovieList = useMemo(() => {
    return movieList.filter(movie => movie.startAt > currentTime);
  }, [currentTime]);

  const handleCurrentMovie = useCallback((movie: ICurrentMovie) => {
    dispatch(setSelectMovie(movie));
    next();
  }, []);

  return (
    <MovieTableBlock>
      {!isViewTotalMovie ? (
        <section className="txt-c">
          <div>
            가장 빨리 볼수있는 영화 top 2
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-around",
                padding: "0 18px"
              }}
            >
              {timeFilterMovieList
                .filter((_, index) => index <= 1)
                .map(movie => (
                  <div
                    key={movie.id}
                    style={{ border: "1px solid gray", padding: "10px" }}
                  >
                    <div>영화 포스터</div>
                    <div>{movie.title}</div>
                    <div>
                      <span>
                        {movie.startAt} ~ {movie.endAt}
                      </span>
                    </div>
                    <button onClick={() => handleCurrentMovie(movie)}>
                      지금 예매
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <button
            style={{ marginTop: "100px" }}
            onClick={() =>
              dispatch(
                setIsViewTotalMovie({ type: "isViewTotalMovie", value: true })
              )
            }
          >
            전체 상영 시간표 보러가기
          </button>
        </section>
      ) : (
        <div>
          청춘 영화관
          {timeFilterMovieList.map(movie => (
            <div
              key={movie.id}
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "space-between",
                border: "1px solid gray",
                marginBottom: "30px"
              }}
              onClick={() => handleCurrentMovie(movie)}
            >
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "5px" }}>{movie.startAt}</div>
                <div style={{ marginRight: "5px" }}>
                  영화 포스터 {movie.title}
                </div>
                <div>{movie.grade}</div>
              </div>
              <div>{movie.lastSeats}석</div>
            </div>
          ))}
        </div>
      )}
    </MovieTableBlock>
  );
};

const MovieTableBlock = styled.article``;

export default Index;
