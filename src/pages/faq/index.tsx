import { useState } from "react";
import styled from "styled-components";
import BasicLayout from "components/common/BasicLayout";
import Divider from "components/atom/Divider";

import Accordion from "@mui/material/Accordion";
import { styled as st } from "@mui/material/styles";
import MuiAccordionSummary, {
  AccordionSummaryProps
} from "@mui/material/AccordionSummary";

// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowIcon from "components/atom/ArrowIcon";

const AccordionSummary = st((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    expandIcon={<ArrowIcon direction="right" width={12} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: "10px"
  }
}));

const AccordionDetails = st(MuiAccordionDetails)(({ theme }) => ({
  padding: "24px",
  borderTop: "1px solid #E6E6E6",
  background: "white"
}));

const Index = () => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <BasicLayout headerTitle="자주 묻는 질문" back={true} footer={false}>
      <FaqBlock>
        <section className="faq-nav">
          {[
            "전체",
            "서비스안내",
            "회원정보",
            "교육 문의",
            "오류/불만",
            "기타"
          ].map(type => (
            <div key={type} className="custom-font-list-title">
              {type}
            </div>
          ))}
        </section>

        <Divider height={3} />

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <MuiAccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </MuiAccordionDetails>
        </Accordion> */}
        <Accordion
          disableGutters
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Collapsible Group Item #1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          disableGutters
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Collapsible Group Item #2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          disableGutters
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Collapsible Group Item #3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </FaqBlock>
    </BasicLayout>
  );
};

const FaqBlock = styled.article`
  .faq-nav {
    padding: 30px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    div {
      text-align: center;
      border: 1px solid var(--border-color2);
      padding: 13px 0;
      border-radius: 4px;
    }
  }
  .Mui-expanded {
    margin: 0;
  }
`;

export default Index;
