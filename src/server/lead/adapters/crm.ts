import { config } from '../config'
import { interestLabels, type CrmAdapter, type Lead } from '../types'

/**
 * CRM adapters. Swapping HubSpot for Salesforce is a `LEAD_CRM` change —
 * the pipeline and the frontend are untouched.
 */

export const hubspotCrm: CrmAdapter = {
  name: 'hubspot',
  async upsert(lead) {
    const token = config.hubspot.token
    if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN is not set')

    const properties: Record<string, string> = {
      email: lead.email,
      firstname: lead.firstName,
      lastname: lead.lastName,
      phone: lead.phone,
      city: lead.city,
      state: lead.state,
      zip: lead.zip,
      website: lead.landingPage,
      hs_lead_status: 'NEW',
      ug_audience: lead.audience,
      ug_interests: lead.interestList.join('; '),
      ug_referral_source: lead.referralSource,
      ug_utm_source: lead.utmSource,
      ug_utm_medium: lead.utmMedium,
      ug_utm_campaign: lead.utmCampaign,
      ug_submission_id: lead.submissionId,
    }

    // Upsert by email so a repeat signup updates rather than duplicates.
    const res = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email`,
      {
        method: 'PATCH',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ properties }),
      },
    )

    if (res.status === 404) {
      const created = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ properties }),
      })
      if (!created.ok) throw new Error(`HubSpot create failed (${created.status}): ${await created.text()}`)
      return
    }
    if (!res.ok) throw new Error(`HubSpot upsert failed (${res.status}): ${await res.text()}`)
  },
}

/**
 * Salesforce placeholder. The shape is proven by the HubSpot adapter above;
 * filling this in is an isolated change behind the same interface.
 */
export const salesforceCrm: CrmAdapter = {
  name: 'salesforce',
  async upsert(lead) {
    throw new Error(
      `Salesforce adapter not implemented — lead ${lead.submissionId} was not sent to a CRM`,
    )
  },
}

export const noopCrm: CrmAdapter = {
  name: 'none',
  async upsert() {},
}

export const crmRegistry: Record<string, CrmAdapter> = {
  hubspot: hubspotCrm,
  salesforce: salesforceCrm,
  none: noopCrm,
}

/** Shared helper for building a readable interest summary. */
export const interestSummary = (lead: Lead) =>
  lead.interestList.length ? lead.interestList.join(', ') : interestLabels.customer
