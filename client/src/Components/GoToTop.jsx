import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";

const GoToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    const listenToScroll = () => {
        let heightToHidden = 10;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (winScroll > heightToHidden) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    }, []);

    const GoToButton = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    return (
        <>
            <Wrapper>
                {isVisible && (
                    <div className="top-btn" onClick={GoToButton}>
                        <FaArrowUp className="top-btn--icon" />
                    </div>
                )}
            </Wrapper>
            
        </>
    );

    
};

const Wrapper = styled.section`
  display:  flex;
  align-items: center;
  justify-content: center;

  .top-btn{
      font-size: 2rem;
      border-radius: 50%;
      background-color: blue;
      position: fixed;
      
      z-index; 999;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &--icon{
          animation: GoToTop 1.2s linear infinite alternate-reverse;
      }

      @keyframes GoToTop {
          0%{
              transform: translateY(-0.5rem);
          }
          100%{
              transform: translateY(1rem);
          }
      }
  }
`;



export default GoToTop;