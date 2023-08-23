/* eslint-disable @typescript-eslint/no-unused-vars */
import { get, reverse } from "lodash";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BreadcrumbItem = styled(Breadcrumb.Item)`
`;

function BreadcrumbPage() {
  const { activePage, navigation, subSideNavActive } = useSelector((state: any) => state?.ui);
  const [breadcrumbs, setBreadcrumbs] = useState<any>()

  useEffect(() => {
    let breadcrumsData: any = [{ ...activePage, last: true }]
    if (activePage?.idParent) {
      const parent1 = get(navigation.filter((f: any) => f?.id == activePage?.idParent), 0)
      breadcrumsData.push(parent1)

      if (parent1.idParent) {
        const parent2 = get(navigation.filter((f: any) => f?.id == parent1?.idParent), 0)
        breadcrumsData.push(parent2)

        if (parent2.idParent) {
          const parent3 = get(navigation.filter((f: any) => f?.id == parent2?.idParent), 0)
          breadcrumsData.push(parent3)
        }
      }
    }

    setBreadcrumbs(reverse(breadcrumsData))
  }, [activePage])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/" style={{ lineHeight: "1.2" }}>
          {/* <img
            src="/static/icons/home-2.svg"
            alt=""
            style={{ width: "1rem" }}
          /> */}
        </BreadcrumbItem>
        {
          breadcrumbs?.map((b: any) => <BreadcrumbItem href={b?.path} key={nanoid()} active={b?.last}>{b?.display}</BreadcrumbItem>)
        }
      </Breadcrumb>
    </>
  );
}

export default React.memo(BreadcrumbPage)
